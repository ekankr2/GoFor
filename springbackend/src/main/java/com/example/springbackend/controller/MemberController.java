package com.example.springbackend.controller;

import com.example.springbackend.controller.request.MemberRequest;
import com.example.springbackend.controller.session.UserInfo;
import com.example.springbackend.service.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Slf4j
@Controller
@RequestMapping("/member")
@CrossOrigin(origins = "http://localhost:8080", allowedHeaders = "*")
public class MemberController {

    private UserInfo info;

    @Autowired
    private MemberService service;

    private HttpSession session;

    @PostMapping("/register")
    public ResponseEntity<Void> Register(@Validated @RequestBody MemberRequest memberRequest)
            throws Exception {
        log.info("Register(): " + memberRequest.getMember_id() + ", " + memberRequest.getMember_pw()
                + ", " + memberRequest.getEmail() + ", " + memberRequest.getName());

        service.register(memberRequest);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<UserInfo> Login(@RequestBody MemberRequest memberRequest, HttpServletRequest request)
            throws Exception {
        log.info("Login() - member_id: " + memberRequest.getMember_id() + ", member_pw: " + memberRequest.getMember_pw());

        Boolean isSuccess = service.login(memberRequest);

        if(isSuccess) {
            log.info("Login Success");
            // 세션 할당
            info = new UserInfo();
            info.setMember_id(memberRequest.getMember_id());
            info.setName(memberRequest.getName());
            log.info("Session Info: " + info);

            session = request.getSession();
            session.setAttribute("member", info);
        }else {
            log.info("Login Failure");
            info = null;
        }
        return new ResponseEntity<UserInfo>(info, HttpStatus.OK);
    }

    @PostMapping("/needSession")
    public ResponseEntity<Boolean> postNeedSession(HttpServletRequest request) throws Exception {

        //UserInfo info = (UserInfo) session.getAttribute("member");
        Object obj = session.getAttribute("member");

        Boolean isLogin = false;

        if (obj != null) {
            log.info("Session Info: " + info);

            isLogin = service.checkUserIdValidation(info.getMember_id());

            return new ResponseEntity<Boolean>(isLogin, HttpStatus.OK);
        }

        return new ResponseEntity<Boolean>(isLogin, HttpStatus.OK);
    }

    // 로그인 -> 게시물 작성
    //       -> 게시물 수정
    //       -> 팔로우
    //       -> 댓글 달기
    //       -> 삭제

    // 로그아웃 -> 게시물 작성
    // Spring 자체에서 처리가 불가능하므로
    // 로그아웃시 Vue쪽에 세션이 없다는 정보를 전달해줘야한다.
    // 그리고 사용자가 게시물 작성을 누르면 이 정보(참, 거짓)을 보고
    // 강제로 로그인 페이지로 보내거나 참(세션이 있음)이면 그대로 처리하는 방식을 취하도록 만들면 됨
    @PostMapping("/removeSession")
    public ResponseEntity<Boolean> removeSession(HttpServletRequest request) throws Exception {
        Boolean mustFalse = false;

        session.invalidate();

        return new ResponseEntity<Boolean>(mustFalse, HttpStatus.OK);
    }
}
