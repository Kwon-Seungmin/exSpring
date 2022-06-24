package com.Board.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LunchDTO {

    private String name;
    private String category;
    private Integer price;

}
