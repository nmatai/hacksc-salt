import re


def preprocess_text(text, remove_tags=False, remove_stopwords=False):
    # Remove all punctuations
    text = re.sub(r'([`~@$^&\\;\'<>.,!?()#"|=\-:/_*\[\]+%])', " ", text)

    # Lower text
    text = text.lower()

    if remove_tags:

        # Substitute IP
        text = re.sub(
            (
                r"(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]|(\*?))\.){3}(?:(?:2([0-4]"
                r"[0-9]|5[0-5])|[0-1]?[0-9]?[0-9]|(\*))?)"
            ),
            " ",
            text,
        )

        # Substitute date
        text = re.sub(
            (
                r"((\d\d?(st|nd|rd|th)?([\-\./])?)\s?(((january|jan)|(february|feb)|(march"
                r"|mar)|(april|apr)|may|(june|jun)|(july|jul)|(august|aug)|(september|sept)"
                r"|(october|oct)|(november|nov)|(december|dec)))((\s)?([\-\./])?(,)?(\s)?"
                r"(\d\d\d?\d?))?)|(([\d]+)([\-])([\d]+)([\-])([\d]+))|(((january|jan)|"
                r"(february|feb)|(march|mar)|(april|apr)|may|(june|jun)|(july|jul)|(august|"
                r"aug)|(september|sept)|(october|oct)|(november|nov)|(december|dec))([\s\-]"
                r")(|([\d]+){1,2}([\s\-]|\,))([\d]+){4})|(january|february|march|april|may|"
                r"june|july|august|september|october|november|december)|(([\d]+)([\.])([\d]"
                r"+)([\.])([\d]+))|(([\d]+)([/])([\d]+)([/])([\d]+))"
            ),
            " ",
            text,
        )

        # Remove HTML tags
        text = re.sub(
            (
                r"(<script(\s|\S)*?<\/script>)|(<style(\s|\S)*?<\/style>)|(<!--(\s|\S)*?-->"
                r")|(<\/?(\s|\S)*?>)"
            ),
            " ",
            text,
        )

        # Substitute Email
        text = re.sub(
            (
                r"[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-"
                r"9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
            ),
            " ",
            text,
        )

        # Substitute path
        text = re.sub(
            (
                r'([a-zA-Z]:\\(((?![<>:"/\\|?*])[a-zA-Z0-9])+((?![ .])\\)?)*)|(\s\/[A-z0-9-'
                r"_+]*)(\/([A-z0-9-_+]*)\/*[A-z0-9-_+]+)"
            ),
            " ",
            text,
        )

        # Substitute URL
        text = re.sub(
            (
                r"([--:\w?@%&+~#=]*\.[a-z]{2,4}\/{0,2})((?:[?&](?:\w+)=(?:\w+))+|"
                r"[--:\w?@%&+~#=]+)?"
            ),
            " ",
            text,
        )

        # Substitute time
        text = re.sub(
            (
                r"((^(([0-1]?\d)|(2[0-3]))(:|\.|)?[0-5][0-9]$)|(^((0?[1-9])|(1[0-2]))(:|\.|"
                r")([0-5][0-9])( ||,)([aA]|[pP])[mM]$)|(^([aA]|[pP])[mM]( |,|)((0?[1-9])|(1"
                r"[0-2]))(|:|\.)([0-5][0-9])$)|([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?"
                r")|(\d\d?\s?((am|AM|pm|PM)))"
            ),
            " ",
            text,
        )

        # Substitute floating point numbers
        text = re.sub(
            r"([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[eE]([+-]?\d+))?",
            " ",
            text,
        )

        # Subtitute alphanumeric numbers
        text = re.sub(
            r"(\S+{number}\S*)|(\S*{number}\S+)", " ", text
        )

    # Convert multiple white spaces to one white space
    text = re.sub(r"\s{2,}", " ", text)

    if remove_stopwords:
        stop_words = []
        with open("stop_words.txt", "r") as stop_words_file:
            stop_words = stop_words_file.read().split("\n")
        # Remove stop words
        text_temp = ""
        for word in text.split(" "):
            if word not in stop_words:
                text_temp += word + " "
        text = text_temp

    # Strip texts of white spaces
    text = text.strip()

    return text


def extract_paragraphs(paragraphs, min_word_threshold=10):
    final_paragraphs = {}
    for id, text in paragraphs.items():
        # Add white space before and after punctuation
        temp = preprocess_text(text)
        if len(temp.split()) > min_word_threshold:
            final_paragraphs[id] = text

    return final_paragraphs
