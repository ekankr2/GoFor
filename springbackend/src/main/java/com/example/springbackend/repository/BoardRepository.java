package com.example.springbackend.repository;

import com.example.springbackend.controller.request.BoardRequest;
import com.example.springbackend.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Long> {

}
