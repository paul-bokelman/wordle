package com.javatpoint.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.javatpoint.model.Words;
import com.javatpoint.service.WordsService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class WordsController {
    @Autowired
    WordsService wordsService;

    @GetMapping("/words")
    private List<Words> getAllWords() {
        return wordsService.getAllWords();
    }

    @GetMapping("/word/{id}")
    private Words getWords(@PathVariable("id") int id) {
        return wordsService.getWordById(id);
    }

    @GetMapping("/word/random")
    @ResponseBody
    private Words getRandomWord(@RequestParam Integer length) {
        System.out.println("length: " + length);
        return wordsService.getRandomWord(length);
    }

    @DeleteMapping("/word/remove/{id}")
    private void deleteWord(@PathVariable("id") int id) {
        wordsService.delete(id);
    }

    @PostMapping("/word/add")
    private long saveWord(@RequestBody Words words) {
        wordsService.saveOrUpdate(words);
        return words.getWordId();
    }

    @PutMapping("/word/update")
    private Words update(@RequestBody Words words) {
        wordsService.saveOrUpdate(words);
        return words;
    }
}
