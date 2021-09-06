package com.example.springbackend.repository;

import com.example.springbackend.controller.request.BoardRequest;
import com.example.springbackend.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {
    @Query("select m from Board m where m.boardNo = :boardNo")
    List<Board> findByBoardNo(Long boardNo);
}

