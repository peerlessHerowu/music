package com.example;

import com.example.entity.Song;
import com.example.service.impl.SongService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class MyMusicApplicationTests {


    @Autowired
    SongService songService;
    @Test
    void contextLoads() {
        List<Song> songs = songService.findByKey("%"+"林"+"%",4,10);
        System.out.println(songs.size());
    }
    @Test
    void downLoad() {

    }

}
