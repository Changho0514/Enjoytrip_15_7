package com.ssafy.hotplace.controller;

import java.io.File;
import java.nio.charset.Charset;
import java.text.SimpleDateFormat;
import java.util.*;

import javax.servlet.ServletContext;

import com.ssafy.config.Result;
import com.ssafy.hotplace.model.*;
import com.ssafy.hotplace.model.service.HotPlaceService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin("*")
@RequestMapping("/hotplace")
@Api(tags = {"핫플레이스  API"})
public class HotPlaceController {

	private final Logger logger = LoggerFactory.getLogger(HotPlaceController.class);

	private ServletContext servletContext;
	private HotPlaceService hotplaceService;

	public HotPlaceController(ServletContext servletContext, HotPlaceService hotplaceService) {
		super();
        this.servletContext = servletContext;
		this.hotplaceService = hotplaceService;
	}

	@ApiOperation(value = "파일 제외 핫플 쓰기")
	@PostMapping("/write")
    public ResponseEntity<?> write(@RequestBody HotPlaceDto hotplaceDto) {
        logger.debug("write hotplaceDto : {}", hotplaceDto);
        try {
            hotplaceService.write(hotplaceDto);
            return new ResponseEntity<Integer>(hotplaceDto.getHotplaceNo(), HttpStatus.OK);
        } catch (Exception e) {
        	return new ResponseEntity<Result>(new Result("fail", "파일 제외 핫플 write 실패"), HttpStatus.OK);
        }
    }

	@ApiOperation(value = "파일 핫플 쓰기")
    @PostMapping("/write/file")
    public ResponseEntity<?> writeFile(@RequestParam("hotplaceNo") int hotplaceNo,
                                       @RequestParam("upfile") MultipartFile file) {
        logger.debug("write hotplaceDto : {}", file);
        try {//        FileUpload 관련 설정.
            logger.debug("MultipartFile.isEmpty : {}", file.isEmpty());
            if (!file.isEmpty()) {
                String realPath = servletContext.getRealPath("/upload");
                String today = new SimpleDateFormat("yyMMdd").format(new Date());
                String saveFolder = realPath + File.separator + today;
                logger.debug("저장 폴더-------------------------- : {}", saveFolder);
                File folder = new File(saveFolder);
                if (!folder.exists())
                    folder.mkdirs();
                String originalFileName = file.getOriginalFilename();
                if (!originalFileName.isEmpty()) {
                    String saveFileName = UUID.randomUUID().toString() + originalFileName.substring(originalFileName.lastIndexOf('.'));
                    
                    Map<String, Object> params = new HashMap<>();
                    params.put("hotplaceNo", hotplaceNo);
                    params.put("saveFolder", today);
                    params.put("saveFile", saveFileName);
                    params.put("originalFile", originalFileName);
                    logger.debug("원본 파일 이름 : {}, 실제 저장 파일 이름 : {}", file.getOriginalFilename(), saveFileName);
                    file.transferTo(new File(folder, saveFileName));
                    hotplaceService.writeFile(params);
                }
                return new ResponseEntity<Result>(new Result("success", "파일만 핫플 write 성공"), HttpStatus.OK);
            } else {
            	return new ResponseEntity<Result>(new Result("fail", "파일이 없습니다"), HttpStatus.OK);
            }
        } catch (Exception e) {
        	return new ResponseEntity<Result>(new Result("fail", "파일만 핫플 write 실패"), HttpStatus.OK);
        }
    }

	@ApiOperation(value = "파일 전체 가져오기")
	@PostMapping("/list")
	public ResponseEntity<?> list(@RequestBody HotPlaceParameterDto hotplaceParameterDto) {
		System.out.println("key -> "+hotplaceParameterDto.getKey());
		HotPlaceListDto list;
		try {
			list = hotplaceService.hotplaceList(hotplaceParameterDto);
			HttpHeaders header = new HttpHeaders();
			header.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
			return ResponseEntity.ok().headers(header).body(list);
		} catch (Exception e) {
			return new ResponseEntity<Result>(new Result("fail", "핫플목록 가져오기 실패"), HttpStatus.OK);
		}
	}

	@ApiOperation(value = "핫플 top3 가져오기")
	@GetMapping("/top3")
	public ResponseEntity<?> list() {
		List<HotPlaceDto> list;
		try {
			list = hotplaceService.hotplaceTOP3();
			if(list != null) {
				return new ResponseEntity<List<HotPlaceDto>>(list, HttpStatus.OK);
			} else {
				return new ResponseEntity<Result>(new Result("fail", "top3 핫플 목록이 없습니다"), HttpStatus.OK);
			}
		} catch (Exception e) {
			return new ResponseEntity<Result>(new Result("fail", "핫플목록 가져오기 실패"), HttpStatus.OK);
		}
	}

	@ApiOperation(value = "핫플 상세보기")
	@GetMapping("/detail/{hotplaceno}")
	public ResponseEntity<?> detail(@PathVariable("hotplaceno") int hotplaceNo) {
		logger.info("detail hotplaceNo : {}", hotplaceNo);
		HotPlaceDto hotplaceDto = null;
		try {
			hotplaceDto = hotplaceService.detail(hotplaceNo);
			return new ResponseEntity<HotPlaceDto>(hotplaceDto, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Result>(new Result("fail", "핫플 가져오기 실패"), HttpStatus.OK);
		}
	}

	@ApiOperation(value = "핫플 수정")
	@PutMapping("/modify")
	public ResponseEntity<?> modify(@RequestBody HotPlaceDto hotplaceDto){
		logger.debug("modify hotplaceDto : {}", hotplaceDto);
		try {
			hotplaceService.modify(hotplaceDto);
			return new ResponseEntity<Result>(new Result("success", "핫플 수정 성공"), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Result>(new Result("fail", "핫플 수정 실패"), HttpStatus.OK);
		}
	}

	@ApiOperation(value = "핫플 삭제")
	@DeleteMapping("/delete/{hotplaceno}")
	public ResponseEntity<?> delete(@PathVariable("hotplaceno") int hotplaceNo) {
		logger.debug("delete hotplaceNo : {}", hotplaceNo);
		try {
			hotplaceService.delete(hotplaceNo);
			return new ResponseEntity<Result>(new Result("success", "핫플 삭제 성공"), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Result>(new Result("fail", "핫플 삭제 실패"), HttpStatus.OK);
		}
	}
	
	@ApiOperation(value = "게시물 추천수 가져오기")
	@GetMapping("/getRecommend/{hotplaceNo}")
	public ResponseEntity<?> getRecommend(@PathVariable("hotplaceNo") int hotplaceNo){
		logger.debug("recommend hotplace : {}", hotplaceNo);
		try {
			int cnt = hotplaceService.getRecommendCount(hotplaceNo);
			return new ResponseEntity<Integer>(cnt, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Result>(new Result("fail", "추천수 가져오기 실패"), HttpStatus.OK);
		}
	}
	
	@ApiOperation(value = "추천하기")
	@GetMapping("/recommend/{hotplaceNo}/{userId}")
	public ResponseEntity<?> recommend(@PathVariable("hotplaceNo") int hotplaceNo,@PathVariable("userId") String userId) throws Exception {
		try {
			hotplaceService.changeRecommendState(hotplaceNo, userId);
			return new ResponseEntity<Result>(new Result("success", "추천하기 성공"), HttpStatus.OK);
		} catch (Exception e) {
			logger.error("핫플레이스  추천 실패 : {}", e);
			return new ResponseEntity<Result>(new Result("fail", "추천하기 실패"), HttpStatus.OK);
		}
	}

	@ApiOperation(value = "나의 추천 목록 가져오기")
	@GetMapping("/myRecommendList/{userId}")
	public ResponseEntity<?> getMyRecommendList(@PathVariable("userId") String userId) throws Exception {
		try {
			List<HotPlaceDto> myRecommendList = hotplaceService.getMyRecommendList(userId);
			return new ResponseEntity<List<HotPlaceDto>>(myRecommendList, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("나의 추천 목록 가져오기 실패 : {}", e);
			return new ResponseEntity<Result>(new Result("fail", "나의 추천 목록 가져오기 실패"), HttpStatus.OK);
		}
	}
	
	@ApiOperation(value = "내가 추천을 누른 목록 가져오기")
	@GetMapping("/myRecommend/{userId}")
	public ResponseEntity<?> getMyRecommend(@PathVariable("userId") String userId) throws Exception {
		try {
			List<Integer> list = hotplaceService.getMyRecommend(userId);
			return new ResponseEntity<List<Integer>>(list, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("나의 추천 목록 가져오기 실패 : {}", e);
			return new ResponseEntity<Result>(new Result("fail", "나의 추천 목록 가져오기 실패"), HttpStatus.OK);
		}
	}

}
