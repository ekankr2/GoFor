package com.example.backend.controller.member;

import com.example.backend.controller.member.request.MemberRequest;
import com.example.backend.controller.session.UserInfo;
import com.example.backend.service.MemberService;
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
@CrossOrigin(origins = "http://localhost:8080",allowedHeaders = "*")
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
        log.info("Login() - member_id: " + memberRequest.getMember_id() + ", member_pw: " + memberRequest.getMember_pw() +
                "email: " + memberRequest.getEmail() + ", name: " + memberRequest.getName());

        Boolean isSuccess = service.login(memberRequest);

        if(isSuccess) {
            log.info("Login Success");
            // 세션 할당
            info = new UserInfo();
            info.setUserId(memberRequest.getMember_id());
            log.info("Sessing Info: " + info);

            session = request.getSession();
            session.setAttribute("member", info);
        }else {
            log.info("Login Failure");
            info = null;
        }
        return new ResponseEntity<UserInfo>(info, HttpStatus.OK);
    }

}
