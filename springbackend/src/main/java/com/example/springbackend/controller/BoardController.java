package com.example.springbackend.controller;

import com.example.springbackend.controller.request.BoardRequest;
import com.example.springbackend.entity.Board;
import com.example.springbackend.service.BoardService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@Controller
@RequestMapping("/board")
@CrossOrigin(origins = "http://localhost:8080", allowedHeaders = "*")
public class BoardController {

    @Autowired
    private BoardService service;

    @PostMapping("/register")
    public ResponseEntity<Void> Register(@Validated @RequestBody BoardRequest boardRequest)
        throws Exception{
        log.info("Register Board(): " + boardRequest.getWriter() + ", " + boardRequest.getTitle()+ ", " +
                boardRequest.getContent());

        service.register(boardRequest);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/lists")
    public List<Board> getLists (@Validated @RequestBody BoardRequest boardRequest) throws Exception {
        log.info("getLists(): " + boardRequest.getWriter() + ", " + boardRequest.getTitle() + ", " +
                boardRequest.getContent());


        return service.boardFindAll();
    }
}
