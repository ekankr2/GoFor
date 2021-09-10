package com.example.springbackend.service;

import com.example.springbackend.controller.request.CommentRequest;
import com.example.springbackend.entity.Board;

import java.util.List;
import java.util.Optional;

public interface CommentService {
    public void register(CommentRequest commentRequest) throws Exception;
    public List<Board> findByComment(Long boardNo);
}
