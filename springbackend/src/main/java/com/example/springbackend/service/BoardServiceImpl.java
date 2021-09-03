package com.example.springbackend.service;

import com.example.springbackend.controller.request.BoardRequest;
import com.example.springbackend.entity.Board;
import com.example.springbackend.repository.BoardRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class BoardServiceImpl implements BoardService{

    @Autowired
    private BoardRepository boardRepository;

    @Override
    public void register(BoardRequest boardRequest) throws Exception {
        Board boardEntity = new Board(boardRequest.getWriter(), boardRequest.getTitle(), boardRequest.getContent(),
                boardRequest.getRegDate());

        boardRepository.save(boardEntity);
    }

    @Override
    public List<Board> boardFindAll() throws Exception {

        return boardRepository.findAll();
    }
}
