package com.example.springbackend.service;

import com.example.springbackend.controller.request.BoardRequest;
import com.example.springbackend.entity.Board;
import com.example.springbackend.repository.BoardRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class BoardServiceImpl implements BoardService{

    @Autowired
    private BoardRepository boardRepository;

    @Override
    public void register(BoardRequest boardRequest) throws Exception {
        Board boardEntity = new Board(boardRequest.getBoardNo(), boardRequest.getWriter(), boardRequest.getTitle(),
                boardRequest.getContent(), boardRequest.getRegDate(), boardRequest.getUpdDate());

        boardRepository.save(boardEntity);
    }

    @Override
    public List<Board> boardFindAll() throws Exception {

        return boardRepository.findAll();
    }

    @Override
    public List<Board> findByBoardNo(Long boardNo) throws Exception {

        return boardRepository.findByBoardNo(boardNo);
    }

    @Override
    public void modify(BoardRequest boardRequest) throws Exception {
        Optional<Board> board = boardRepository.findById(boardRequest.getBoardNo());
        board.ifPresent(selectBoard ->{
            selectBoard.setWriter(boardRequest.getWriter());
            selectBoard.setTitle(boardRequest.getTitle());
            selectBoard.setContent(boardRequest.getContent());
            selectBoard.setUpdDate(boardRequest.getUpdDate());
            boardRepository.save(selectBoard);
        });
    }

    @Override
    public void delete(Long boardNo) throws Exception {

        boardRepository.deleteById(boardNo);
    }
}
