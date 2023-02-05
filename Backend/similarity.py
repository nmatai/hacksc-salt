import os
from collections import Counter
import tqdm
import json
import numpy as np
from sentence_transformers import SentenceTransformer, util
import openai

import logging
LOGGER = logging.getLogger("hacksc_backend")
openai.api_key = os.getenv("OPENAI_API_KEY")

class ClauseSimilarity:
    def __init__(
        self, nda_template_path, similarity_threshold1=0.9, similarity_threshold2=0.5
    ):
        self.THRESHOLD1 = similarity_threshold1
        self.THRESHOLD2 = similarity_threshold2
        LOGGER.info(f"Loading sentence similarity model")
        self.model = SentenceTransformer("all-MiniLM-L6-v2")
        LOGGER.info(f"Loading NDA template")
        self.load_nda_template(nda_template_path)
        LOGGER.info(f"Loading paragraph embeddings")
        self.load_paragraph_embeddings()
        LOGGER.info(f"Loading sentence embeddings")
        self.load_sentence_embeddings()

    def get_missing_clauses(self, paragraphs):
        LOGGER.info(f"Encoding input paragraphs")
        input_paragraphs = list(paragraphs.values())
        input_ids = list(paragraphs.keys())
        input_paragraph_embeddings = self.model.encode(
            input_paragraphs, show_progress_bar=True, convert_to_tensor=True
        )

        LOGGER.info(f"Computing cosine similarities")
        cosine_scores = util.cos_sim(
            input_paragraph_embeddings, self.template_paragraph_embeddings
        ).numpy()

        input_sections = []
        incomplete_clauses = []
        unidentified_clauses = []
        # Get the index of the maximum element in each row
        row_wise_max_index = np.argmax(cosine_scores, axis=1)
        for i, index in enumerate(row_wise_max_index):
            # If match is above THRESHOLD1 then it is a good match
            if cosine_scores[i][index] >= self.THRESHOLD1:
                # TODO: Check for duplicate matches
                input_sections.append(self.template_sections[index])
            # If match is below THRESHOLD1 but above THRESHOLD2 then it is an incomplete match
            elif cosine_scores[i][index] >= self.THRESHOLD2:
                incomplete_clauses.append({
                    "input_clause": input_paragraphs[i],
                    "input_id": input_ids[i],
                    "template_section": self.template_sections[index],
                    "template_clause": self.template_paragraphs[index]
                })
                # incomplete_clauses.append(input_ids[i])
            else:
                unidentified_clauses.append(input_ids[i])

        LOGGER.info(f"Number of identified sections: {len(input_sections)}")
        LOGGER.info(f"Number of unidentified sections: {len(unidentified_clauses)}")
        LOGGER.info(f"Duplicate check counter: {Counter(input_sections)}")
        missing_sections = set(self.template_sections) - set(input_sections)
        # Populate missing sections and their clauses
        missing_clauses = []
        for section_name in missing_sections:
            missing_clauses.append({
                "title": section_name,
                "paragraph": self.template_json[section_name]['paragraph']
            })

        return missing_clauses, incomplete_clauses, unidentified_clauses

    def get_missing_subclauses(self, incomplete_clauses):
        incomplete_clause_suggestion = []
        for data in incomplete_clauses:
            template_clause = data["template_clause"]
            input_clause = data["input_clause"]
            
            # Create a prompt for GTP 3
            prompt = f"Given the template clause below:\n\n{template_clause}\n\nIs there anything missing in the input clause below?\n\n{input_clause}"

            response = openai.Completion.create(
                model="text-davinci-003",
                prompt=prompt,
                temperature=0,
                max_tokens=200,
                top_p=0.5,
                frequency_penalty=0,
                presence_penalty=0
            )

            suggestion = response["choices"][0]["text"]
            LOGGER.info(f"OpenAI API response: {suggestion}")
            incomplete_clause_suggestion.append({
                "title": data["template_section"],
                "id": data["input_id"],
                "suggestion": f"Missing text: {suggestion}"
            })
    
        return incomplete_clause_suggestion

    def get_unwanted_clauses(self):
        pass

    def load_nda_template(self, nda_template_path):
        # Load JSON data
        with open(nda_template_path, "r") as f:
            self.template_json = json.load(f)

        # Extract paragraphs from the template JSON
        self.template_sections = []
        self.template_paragraphs = []
        self.template_sentences = []
        for section_name, data in self.template_json.items():
            self.template_sections.append(section_name)
            self.template_paragraphs.append(data["paragraph"])
            self.template_sentences.append(data["sentences"])

    def load_paragraph_embeddings(self):
        self.template_paragraph_embeddings = self.model.encode(
            self.template_paragraphs, convert_to_tensor=True
        )

    def load_sentence_embeddings(self):
        self.template_sentence_embeddings = []
        for sentences in tqdm.tqdm(
            self.template_sentences, total=len(self.template_sentences)
        ):
            self.template_sentence_embeddings.append(
                self.model.encode(sentences, convert_to_tensor=True)
            )
