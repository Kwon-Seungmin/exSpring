package com.Board;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.Board.mapper.DateMapper;
import com.Board.service.DateService;


import lombok.extern.slf4j.Slf4j;

@Slf4j
@SpringBootTest
class ExSpringApplicationTests {

	@Autowired
	private DateMapper dateMapper;

	@Autowired
	private DateService dateService;


	@Test
	void contextLoads() {
		String test1 = dateMapper.selectDate();
		log.info(test1);

		String test2 = dateService.selectDate();
		log.info(test2);
	}

}
