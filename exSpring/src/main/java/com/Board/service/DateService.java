package com.Board.service;

import com.Board.mapper.DateMapper;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service

@RequiredArgsConstructor

public class DateService {

    private final DateMapper dateMapper;

    public String selectDate() {
        return dateMapper.selectDate();
    }

}
