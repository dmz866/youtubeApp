import { Component, OnInit } from '@angular/core';
import { YoutubeService } from 'src/app/services/youtube.service';

declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit
{
  videos: any[] = [];
  videoSeleccionado: any;

  constructor(private youtube: YoutubeService)
  {
    this.youtube.getVideos().subscribe(data =>
    {
      this.videos = data;
    });
  }

  verVideo(video: any)
  {
    this.videoSeleccionado = video;
    $('#myModal').modal();
  }

  cargarVideos()
  {
    this.youtube.getVideos().subscribe(data =>
    {
      this.videos.push.apply(this.videos, data);
    });
  }

  cerrarModal()
  {
    this.videoSeleccionado = null;
    $('#myModal').modal('hide');
  }

  ngOnInit() {
  }

}
