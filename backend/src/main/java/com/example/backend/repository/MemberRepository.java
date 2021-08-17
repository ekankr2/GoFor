package com.example.backend.repository;

import com.example.backend.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    @Query("select m from Member m where m.member_id = :member_id")
    Optional<Member> findByUserId(String member_id);
}
