package com.Board.dto;

import lombok.Getter;

@Getter

public class SearchDTO {
	String[] lunchMemberList;
	String restCategory;

	public SearchDTO(String[] lunchMemberList, String restCategory) {
		this.lunchMemberList = lunchMemberList;
		this.restCategory = restCategory;
	}

}
