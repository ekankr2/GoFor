package com.example.springbackend.service;

import com.example.springbackend.controller.request.BoardRequest;
import com.example.springbackend.entity.Board;

import java.util.List;

public interface BoardService {
    public void register(BoardRequest boardRequest) throws Exception;
    public List<Board> boardFindAll() throws Exception;

}
