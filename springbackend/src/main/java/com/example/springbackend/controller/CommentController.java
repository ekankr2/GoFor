package com.example.springbackend.controller;

import com.example.springbackend.controller.request.BoardRequest;
import com.example.springbackend.controller.request.CommentRequest;
import com.example.springbackend.entity.Board;
import com.example.springbackend.repository.BoardRepository;
import com.example.springbackend.repository.CommentRepository;
import com.example.springbackend.service.BoardService;
import com.example.springbackend.service.CommentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Slf4j
@Controller
@RequestMapping("/comment")
@CrossOrigin(origins = "http://localhost:8080", allowedHeaders = "*")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private CommentRepository commentRepository;

    @PostMapping("/register/{boardNo}")
    public ResponseEntity<Void> Register(@PathVariable Long boardNo,
                                         @Validated @RequestBody CommentRequest commentRequest) throws Exception{

        commentRequest.setBoardNo(boardNo);
        commentService.register(commentRequest);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/lists/{boardNo}")
    public ResponseEntity<List<Board>> getLists(@PathVariable("boardNo") Long boardNo) throws Exception {

        return new ResponseEntity<>(commentService.findByComment(boardNo),HttpStatus.OK);
    }
}
