
from flask import Flask, jsonify, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import random
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
CORS(app)


class Word(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    word = db.Column(db.String(100), unique=True, nullable=False)
    wordLength = db.Column(db.Integer, nullable=False)


@app.route("/words")
def all_words():
    words = Word.query.all()
    return jsonify([{"word": word.word, "wordLength": word.wordLength} for word in words])


@app.route("/word/<int:id>")
def word_by_id(id):
    word = Word.query.get(id)
    return jsonify({"word": word.word, "wordLength": word.wordLength})


@app.route("/word/random")
def random_word():
    length = request.args.get("length")
    words = Word.query.filter_by(wordLength=length)
    count = words.count()
    if count == 0:
        return jsonify({"error": "No words found"})
    else:
        entry = random.randint(0, count - 1)
    return jsonify({"word": words[entry].word, "wordLength": words[entry].wordLength}), 200


@app.route("/word/add", methods=["POST"])
def add_word():
    data = request.get_json()
    new_word = Word(word=data["word"], wordLength=data["wordLength"])
    db.session.add(new_word)
    db.session.flush()
    db.session.commit()
    return jsonify({"message": "Word added!", "id": new_word.id}), 201


@app.route("/word/remove/<int:id>")
def delete_word(id):
    word = Word.query.filter_by(id=id).first()
    db.session.delete(word)
    db.session.commit()
    return jsonify({"message": "Word deleted!"}), 200


if __name__ == "__main__":
    db.create_all()
    app.run(debug=True, port=8080)
