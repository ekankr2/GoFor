package com.example.springbackend.controller;

import com.example.springbackend.controller.request.ReplyRequest;
import com.example.springbackend.service.ReplyService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Slf4j
@Controller
@RequestMapping("/reply")
@CrossOrigin(origins = "http://localhost:8080", allowedHeaders = "*")
public class ReplyController {

    @Autowired
    private ReplyService replyService;

    @PostMapping("/register/{commentNo}")
    public ResponseEntity<Void> Register(@PathVariable Long commentNo,
                                         @Validated @RequestBody ReplyRequest replyRequest) throws Exception{
        replyRequest.setCommentNo(commentNo);
        replyService.register(replyRequest);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
