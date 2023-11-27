package com.ssafy.comment.model.service;

import com.ssafy.comment.model.*;
import com.ssafy.comment.model.mapper.CommentMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    private CommentMapper commentMapper;
    public CommentServiceImpl(CommentMapper commentMapper) {
        super();
        this.commentMapper = commentMapper;
    }
    @Override
    public void write(CommentDto commentDto) throws Exception {
        commentMapper.write(commentDto);
    }

    @Override
    public List<CommentDto> list(int articleNo) throws Exception {
    	return commentMapper.list(articleNo);
    }

    @Override
    public void modify(CommentDto commentDto) throws Exception {
        commentMapper.modify(commentDto);
    }

    @Override
    public void delete(int commentNo) throws Exception {
        commentMapper.delete(commentNo);
    }

    @Override
    public int getArticleNo(int commentNo) throws Exception {
        return commentMapper.getArticleNo(commentNo);
    }
	@Override
	public List<CommentDto> userlist(String userId) throws Exception {
		return commentMapper.userlist(userId);
	}
	@Override
	public String check(int commentNo) throws Exception {
		return commentMapper.check(commentNo);
	}

}
