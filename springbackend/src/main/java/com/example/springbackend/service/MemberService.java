package com.example.springbackend.service;

import com.example.springbackend.controller.request.MemberRequest;
import com.example.springbackend.entity.Member;

public interface MemberService {
    public void register(MemberRequest memberRequest) throws Exception;

    public boolean login(MemberRequest memberRequest) throws Exception;
    public boolean checkUserIdValidation(String member_id) throws Exception;
    public Member findByMemberId(String member_id) throws Exception;
    public void delete(Long memberNo) throws Exception;
}
