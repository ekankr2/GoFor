package com.example.springbackend.service;

import com.example.springbackend.controller.request.CommentRequest;
import com.example.springbackend.entity.Comment;

import java.util.List;

public interface CommentService {
    public void register(CommentRequest commentRequest) throws Exception;
    public List<Comment> getCommentsOfBoard(Long boardNo) throws Exception;
}
