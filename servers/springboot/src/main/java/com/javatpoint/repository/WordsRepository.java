package com.javatpoint.repository;

import org.springframework.data.repository.CrudRepository;
import com.javatpoint.model.Words;

public interface WordsRepository extends CrudRepository<Words, Integer> {
}
