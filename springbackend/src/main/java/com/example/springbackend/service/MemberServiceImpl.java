package com.example.springbackend.service;

import com.example.springbackend.controller.request.MemberRequest;
import com.example.springbackend.entity.Member;
import com.example.springbackend.repository.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
public class MemberServiceImpl implements MemberService{

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void register(MemberRequest memberRequest) throws Exception {
        String encodedPassword = passwordEncoder.encode(memberRequest.getMember_pw());
        memberRequest.setMember_pw(encodedPassword);

        Member memberEntity = new Member(memberRequest.getMember_id(), memberRequest.getMember_pw(),
                memberRequest.getEmail(), memberRequest.getName());
        //memberRepository.save(memberEntity);
        memberRepository.save(memberEntity);
    }

    @Override
    public boolean login(MemberRequest memberRequest) throws Exception {
        Optional<Member> maybeMember = memberRepository.findByUserId(memberRequest.getMember_id());

        if (maybeMember == null)
        {
            log.info("login(): 등록 회원 없음.");
            return false;
        }

        Member loginMember = maybeMember.get();

        if(!passwordEncoder.matches(memberRequest.getMember_pw(), loginMember.getMember_pw()))
        {
            log.info("login(): 비밀번호를 잘못 입력하였습니다.");
            return false;
        }
        return true;
    }

    @Override
    public boolean checkUserIdValidation(String member_id) throws Exception {
        Optional<Member> maybeMember = memberRepository.findByUserId(member_id);

        if(maybeMember == null)
        {
            log.info("login(): 그런 사람 없다.");
            return false;
        }
        return true;
    }
}
