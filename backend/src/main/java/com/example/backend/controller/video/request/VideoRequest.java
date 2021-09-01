package com.example.backend.controller.video.request;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Data
@Slf4j
@NoArgsConstructor
public class VideoRequest {
    private String city;
    private String country;

}
