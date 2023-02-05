import json
from flask import Flask
from flask import request
from flask_cors import CORS

from similarity import ClauseSimilarity
import preprocess
import logger

LOGGER = logger.create_logger("hacksc_backend", "logs")

app = Flask(__name__)
CORS(app)

# Load NDA template metadata
NDA_TEMPLATE_PATH = "nda_template.json"
cs_obj = ClauseSimilarity(NDA_TEMPLATE_PATH)


@app.route("/analyze", methods=["POST"])
def hello_world():
    if request.method == "POST":
        data = request.get_json()
        LOGGER.info(f"Data from word add-in: {data}")
        paragraphs = preprocess.extract_paragraphs(data)
        LOGGER.info(f"Processed input data: {paragraphs}")

        (
            missing_clauses, 
            incomplete_clauses, 
            unidentified_clauses
        ) = cs_obj.get_missing_clauses(paragraphs)
        
        # LOGGER.info(f"Missing clauses: {missing_clauses}")
        # LOGGER.info(f"Incomplete clauses: {incomplete_clauses}")
        # LOGGER.info(f"Unidentified clauses: {unidentified_clauses}")

        incomplete_clause_suggestion = cs_obj.get_missing_subclauses(incomplete_clauses)

        output = {
            "status": "success",
            "missing_clauses": missing_clauses,
            "unidentified_clauses": unidentified_clauses,
            "incomplete_clauses": incomplete_clause_suggestion
        }
        LOGGER.info(f"Output: {output}")

        return output
    else:
        return {"status": "error", "message": "Invalid request method"}
