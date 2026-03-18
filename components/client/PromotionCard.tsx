"use client"
import { MapPin, Calendar, ExternalLink, Music } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  PromotedBand, 
  PromotedLabel, 
  PromotedEvent,
  PromotedJammingHall,
  getGenreVariant 
} from "@/lib/data";
import Image from "next/image";

interface BandCardProps {
  band: PromotedBand;
}

interface LabelCardProps {
  label: PromotedLabel;
}

interface EventCardProps {
  event: PromotedEvent;
}

interface JammingHallCardProps {
  hall: PromotedJammingHall;
}

export function BandCard({ band }: BandCardProps) {
  const genreVariant = getGenreVariant(band.genre);
  
  return (
    <Card hover className="overflow-hidden h-full group">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={band.image}
          alt={band.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          width={600}
          height={600}
        />
        <div className="absolute inset-0 bg-linear-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {band.featured && (
            <Badge variant="breaking" className="shadow-lg">
              Featured
            </Badge>
          )}
        </div>
        
        {/* Promoted badge */}
        <div className="absolute top-3 right-3">
          <Badge variant="sponsored" className="shadow-lg">
            Promoted
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant={genreVariant} className="transition-transform group-hover:scale-105">
            {band.genre}
          </Badge>
        </div>
        
        <h3 className="font-display text-xl tracking-wider mb-2 leading-tight group-hover:text-primary transition-colors duration-300">
          {band.name}
        </h3>
        
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
          <MapPin className="w-3 h-3" />
          <span>{band.city}, {band.country}</span>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {band.bio}
        </p>
        
        <Button asChild variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          <Link href={`/band/${band.id}`}>
            <Music className="w-4 h-4 mr-2" />
            View Profile
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export function LabelCard({ label }: LabelCardProps) {
  return (
    <Card hover className="overflow-hidden h-full group">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={label.image}
          alt={label.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          width={600}
          height={600}
        />
        <div className="absolute inset-0 bg-linear-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {label.featured && (
            <Badge variant="breaking" className="shadow-lg">
              Featured
            </Badge>
          )}
        </div>
        
        {/* Promoted badge */}
        <div className="absolute top-3 right-3">
          <Badge variant="sponsored" className="shadow-lg">
            Promoted
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {label.genres.slice(0, 3).map((genre) => (
            <Badge key={genre} variant={getGenreVariant(genre)} className="text-xs">
              {genre}
            </Badge>
          ))}
        </div>
        
        <h3 className="font-display text-xl tracking-wider mb-2 leading-tight group-hover:text-primary transition-colors duration-300">
          {label.name}
        </h3>
        
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
          <MapPin className="w-3 h-3" />
          <span>{label.country}</span>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {label.description}
        </p>
        
        <Button asChild variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          <Link href={`/label/${label.id}`}>
            <ExternalLink className="w-4 h-4 mr-2" />
            View Label
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export function EventCard({ event }: EventCardProps) {
  const eventDate = new Date(event.date);
  
  return (
    <Card hover className="overflow-hidden h-full group">
      <div className="relative aspect-16/10 overflow-hidden">
        <Image
          src={event.image}
          alt={event.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          width={600}
          height={600}
        />
        <div className="absolute inset-0 bg-linear-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Date badge */}
        <div className="absolute bottom-3 left-3 bg-primary text-primary-foreground px-3 py-2 rounded-sm shadow-lg">
          <div className="text-center">
            <div className="font-display text-2xl leading-none">
              {eventDate.getDate()}
            </div>
            <div className="text-xs uppercase tracking-wider">
              {eventDate.toLocaleDateString("en-US", { month: "short" })}
            </div>
          </div>
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {event.featured && (
            <Badge variant="breaking" className="shadow-lg">
              Featured
            </Badge>
          )}
        </div>
        
        {/* Promoted badge */}
        <div className="absolute top-3 right-3">
          <Badge variant="sponsored" className="shadow-lg">
            Promoted
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {event.genres.slice(0, 2).map((genre) => (
            <Badge key={genre} variant={getGenreVariant(genre)} className="text-xs">
              {genre}
            </Badge>
          ))}
        </div>
        
        <h3 className="font-display text-xl tracking-wider mb-2 leading-tight group-hover:text-primary transition-colors duration-300">
          {event.name}
        </h3>
        
        <div className="space-y-1 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>
              {eventDate.toLocaleDateString("en-US", {
                weekday: "short",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span>{event.city}, {event.country}</span>
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {event.description}
        </p>
        
        <Button asChild variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          <Link href={`/event/${event.id}`}>
            <ExternalLink className="w-4 h-4 mr-2" />
            View Event
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export function JammingHallCard({ hall }: JammingHallCardProps) {
  return (
    <Card hover className="overflow-hidden h-full group">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={hall.image}
          alt={hall.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          width={600}
          height={400}
        />
        <div className="absolute inset-0 bg-linear-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {hall.featured && (
            <Badge variant="breaking" className="shadow-lg">
              Featured
            </Badge>
          )}
        </div>
        
        {/* Promoted badge */}
        <div className="absolute top-3 right-3">
          <Badge variant="sponsored" className="shadow-lg">
            Promoted
          </Badge>
        </div>
        
        {/* Hourly Rate badge */}
        {hall.hourlyRate && (
          <div className="absolute bottom-3 left-3 bg-primary text-primary-foreground px-3 py-1.5 rounded-sm shadow-lg">
            <span className="font-display text-sm">{hall.hourlyRate}</span>
          </div>
        )}
      </div>
      
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {hall.genres.slice(0, 3).map((genre) => (
            <Badge key={genre} variant={getGenreVariant(genre)} className="text-xs">
              {genre}
            </Badge>
          ))}
        </div>
        
        <h3 className="font-display text-xl tracking-wider mb-2 leading-tight group-hover:text-primary transition-colors duration-300">
          {hall.name}
        </h3>
        
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
          <MapPin className="w-3 h-3" />
          <span>{hall.city}, {hall.country}</span>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {hall.description}
        </p>
        
        <Button asChild variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          <Link href={`/jamming-hall/${hall.id}`}>
            <Music className="w-4 h-4 mr-2" />
            View Space
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
