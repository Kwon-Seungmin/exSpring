package com.Board.control;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Board.dto.MemberDTO;
import com.Board.service.MemberService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class MemberController {

	final MemberService memberService;

	// 멤버불러오기
	@GetMapping("/member")
	public ResponseEntity<?> getMemberList() {
		List<MemberDTO> list = new ArrayList<>(memberService.getMemberList());
		return ResponseEntity.ok(list);
	}

}
