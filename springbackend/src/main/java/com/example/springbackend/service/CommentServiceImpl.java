package com.example.springbackend.service;

import com.example.springbackend.controller.request.CommentRequest;
import com.example.springbackend.entity.Board;
import com.example.springbackend.entity.Comment;
import com.example.springbackend.repository.BoardRepository;
import com.example.springbackend.repository.CommentRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class CommentServiceImpl implements CommentService{

    @Autowired
    private BoardRepository boardRepository;
    @Autowired
    private CommentRepository commentRepository;


    @Override
    public void register(CommentRequest commentRequest) throws Exception {
        Comment commentEntity = new Comment(commentRequest.getCommentNo(), commentRequest.getBoardNo(),
                commentRequest.getWriter(), commentRequest.getContent(), commentRequest.getRegDate());

        commentRepository.save(commentEntity);
    }

    @Override
    public List<Board> findByComment(Long boardNo) {
        return boardRepository.findByComment(boardNo);
    }
}
