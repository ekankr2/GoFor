package com.example.backend.service;

import com.example.backend.controller.member.request.MemberRequest;

public interface MemberService {
    public void register(MemberRequest memberRequest) throws Exception;
    public boolean login(MemberRequest memberRequest) throws Exception;
    public boolean checkUserIdValidation(String userId) throws Exception;
}
