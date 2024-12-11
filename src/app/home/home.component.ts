import { Component } from '@angular/core';
import { HeroSectionComponent } from "../home-components/hero-section/hero-section.component";
import { AboutComponent } from "../home-components/about/about.component";
import { StatsComponent } from "../home-components/stats/stats.component";
import { ServicesComponent } from "../services/services.component";
import { BannerComponent } from "../home-components/banner/banner.component";
import { PricingSectionComponent } from "../home-components/pricing-section/pricing-section.component";
import { TestimonialsComponent } from "../home-components/testimonials/testimonials.component";

@Component({
  selector: 'app-home',
  imports: [HeroSectionComponent, AboutComponent, StatsComponent, ServicesComponent, BannerComponent, PricingSectionComponent, TestimonialsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
