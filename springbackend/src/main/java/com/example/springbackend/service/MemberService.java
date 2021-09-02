package com.example.springbackend.service;

import com.example.springbackend.controller.request.MemberRequest;

public interface MemberService {
    public void register(MemberRequest memberRequest) throws Exception;

    public boolean login(MemberRequest memberRequest) throws Exception;
    public boolean checkUserIdValidation(String member_id) throws Exception;
}
