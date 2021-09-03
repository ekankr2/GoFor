package com.example.springbackend.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "boardComment")
@NoArgsConstructor
@Data
public class BoardComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_no")
    private Long commentNo;

    @Column(nullable = false)
    private String writer;

    @Column(nullable = false)
    private String content;

    @CreationTimestamp
    private Date regDate;
}
