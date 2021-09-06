package com.example.springbackend.entity;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.io.Console;
import java.util.Collection;
import java.util.Date;

@Data
@NoArgsConstructor
@Entity
@Table(name = "board")
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_no")
    private Long boardNo;

    @Column(nullable = false)
    private String writer;

    @Column(nullable = false)
    private String title;

    @Column(length = 8000, nullable = false)
    private String content;

    @CreationTimestamp
    private Date regDate;


    public Board(Long boardNo, String writer, String title, String content, Date regDate) {
        this.boardNo = boardNo;
        this.writer = writer;
        this.title = title;
        this.content = content;
        this.regDate = regDate;
    }

}