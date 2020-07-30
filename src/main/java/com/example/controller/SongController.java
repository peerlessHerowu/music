package com.example.controller;

import com.example.entity.SongWord;
import com.example.service.ISongWordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class SongController {

    @Autowired
    ISongWordService songWordService;

    @RequestMapping("/getSongWord")
    @ResponseBody
    public SongWord getSongWord(String songId) {
        SongWord songWord = songWordService.findWordBySongId(songId);
        if (songWord == null) {
            songWord = new SongWord();
            songWord.setLyric("暂时没有歌词哦！");
        }
        System.out.println(songWord);
        return songWord;
    }
}
