package com.example.springbackend.repository;

import com.example.springbackend.entity.Board;
import com.example.springbackend.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    
}

