package com.ssafy.hotplace.model;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class HotPlaceParameterDto {
    private int pgno;
    private int spp;
    private String key;
    private String word;
}