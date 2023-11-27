package com.ssafy.hotplace.model;

import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class HotPlaceListDto {
	
    private List<HotPlaceDto> hotplaces;
    private int currentPage;
    private int totalPageCount;
}
