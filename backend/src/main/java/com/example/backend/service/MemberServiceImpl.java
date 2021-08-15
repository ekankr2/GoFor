package com.example.backend.service;

import com.example.backend.entity.Member;
import com.example.backend.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberServiceImpl implements MemberService{

    @Autowired
    private MemberRepository repository;

    @Override
    public void register(Member member) throws Exception {
        repository.save(member);
    }
}
