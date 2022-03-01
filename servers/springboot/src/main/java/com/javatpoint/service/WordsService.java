package com.javatpoint.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.javatpoint.model.Words;
import com.javatpoint.repository.WordsRepository;

@Service
public class WordsService {
    @Autowired
    WordsRepository wordsRepository;

    public List<Words> getAllWords() {
        List<Words> words = new ArrayList<Words>();
        wordsRepository.findAll().forEach(words1 -> words.add(words1));
        return words;
    }

    public Words getWordById(int id) {
        return wordsRepository.findById(id).get();
    }

    public Words getRandomWord(int length) {
        List<Words> words = new ArrayList<Words>();
        wordsRepository.findAll().forEach(words1 -> {
            if (words1.getWordLength() == length) {
                words.add(words1);
            }
        });
        Random rand = new Random();
        Words randomWord = words.get(rand.nextInt(words.size()));
        return randomWord;
    }

    public void saveOrUpdate(Words words) {
        wordsRepository.save(words);
    }

    public void delete(int id) {
        wordsRepository.deleteById(id);
    }

    public void update(Words words, int id) {
        wordsRepository.save(words);
    }
}