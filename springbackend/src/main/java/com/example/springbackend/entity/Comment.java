package com.example.springbackend.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Comment")
@NoArgsConstructor
@Data
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_no")
    private Long commentNo;

    @Column(nullable = false)
    private Long board_no;

    @Column(nullable = false)
    private String writer;

    @Column(nullable = false)
    private String content;

    @CreationTimestamp
    private Date regDate;

    public Comment(Long commentNo, Long boardNo, String writer, String content, Date regDate){
        this.commentNo = commentNo;
        this.board_no = boardNo;
        this.writer = writer;
        this.content = content;
        this.regDate = regDate;
    }
}
