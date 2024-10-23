import random
import sys
import datetime
import pygame
import math


pygame.init()
WIDTH, HEIGHT = 1000,600
fen = pygame.display.set_mode((WIDTH,HEIGHT))
fond = pygame.image.load('image/pendu.png')
fond = fond.convert()
pygame.display.set_caption("Hangman")


radius = 20
gap = 5
letters = []
sx = round((2400 - (radius * 2 + gap) * 13) / 2)
sy = 30
A = 65
for i in range(26):
	x = sx + gap * 2 + ((radius * 2 + gap) * (i % 2))
	y = sy + ((i // 2) * (gap + radius * 2))
	letters.append([x,y, chr(A + i), True])

l_font = pygame.font.SysFont('arial',20)
w_font = pygame.font.SysFont('arial',80)


run = True

bs = open('bestscore.txt','a+')
dt = open('date.txt','a+')
                
                
mots = []
        
try:
	fl = open(sys.argv[1])
except:
	print("Manque un fichier")
	sys.exit()
                
for l in fl:
	mots.append(l.rstrip("\n"))
            
    
mot=random.choice(mots)
mot=mot.upper()
lettres=[]
faux = 0
win = False
attempts = 0
COULEUR_ROUGE = (255,0,0)
COULEUR_NOIR = (0,0,0)

win_s = "win.wav"
pygame.mixer.music.load(win_s)

bs.seek(0)
f = bs.readlines()



def draw():
	fen.fill((0,0,0))
	fen.blit(fond,(-480,-100))
	win = True
	display_word = ""
	for l in mot:
		if l in lettres:
			display_word += l + " "
		else:
			win = False
			display_word += "_ "
	text = w_font.render(display_word, 1, (255,255,255))
	fen.blit(text, (300, 50))

	for letter in letters:
		x, y, ltr, visible = letter
		if visible: 
			pygame.draw.circle(fen, (255,255,255), (x,y), radius, 3)	
			text = l_font.render(ltr, 1, (255,255,255))
			fen.blit(text, (x - text.get_width()/2, y - text.get_height()/2))
	pygame.display.update()

while run:
	draw()
	for event in pygame.event.get():
		if event.type == pygame.QUIT:
			run = False
	#fen.blit(fond,(-480,-100))
	#pygame.display.flip()
	if event.type == pygame.MOUSEBUTTONDOWN:
		m_x, m_y = pygame.mouse.get_pos()
		for letter in letters:
			x, y, ltr, visible = letter
			if visible:
				dis = math.sqrt((x - m_x)**2 + (y - m_y)**2)
				if dis < radius:
					print(ltr)
					letter[3] = False
					lettres.append(ltr)
					attempts+=1
					if ltr not in mot:
						faux += 1
					
	att = (f"In {attempts} attempts")
	won = True
	for letter in mot:
		if letter not in lettres:
			won = False 
			break

	if won:
		
		
		fen.fill((255,255,255))
		fen.blit(fond,(-300,-100))
		text = w_font.render(f"You Win {mot} !", 1,(255,255,255))
		fen.blit(text, (WIDTH/2 - text.get_width()/2, HEIGHT/2 - text.get_height()/2))
		text2 = w_font.render(att, 1, (255,255,255))
		fen.blit(text2, (280,350))
		
		pygame.mixer.music.play()		
		pygame.display.update()
		pygame.time.delay(3000)
		break
				

	if faux == 5:
		fen.fill((255,255,255))
		fen.blit(fond,(-300,-100))
		text = w_font.render("You LOST...", 1,(255,255,255))
		fen.blit(text, (WIDTH/2 - text.get_width()/2, HEIGHT/2 - text.get_height()/2))
		lose_s = "lose_s.mp3"
		pygame.mixer.music.load(lose_s)
		pygame.mixer.music.play()
		pygame.display.update()
		pygame.time.delay(3000)
		break
	if faux == 1:
		pygame.draw.circle(fen, COULEUR_ROUGE, (240, 200), 30)
		pygame.draw.circle(fen, COULEUR_NOIR, (240, 190), 6)
		pygame.draw.circle(fen, COULEUR_NOIR, (260, 190), 6)
		pygame.draw.line(fen, COULEUR_NOIR, (240,215),(260,215),3)
		pygame.display.update()
	if faux == 2:
		pygame.draw.circle(fen, COULEUR_ROUGE, (240, 200), 30)
		pygame.draw.circle(fen, COULEUR_NOIR, (240, 190), 6)
		pygame.draw.circle(fen, COULEUR_NOIR, (260, 190), 6)
		pygame.draw.line(fen, COULEUR_NOIR, (240,215),(260,215),3)
		pygame.draw.line(fen, COULEUR_ROUGE, (240,230),(240,330),8)
		pygame.display.update()
	if faux == 3:
		pygame.draw.circle(fen, COULEUR_ROUGE, (240, 200), 30)
		pygame.draw.circle(fen, COULEUR_NOIR, (240, 190), 6)
		pygame.draw.circle(fen, COULEUR_NOIR, (260, 190), 6)
		pygame.draw.line(fen, COULEUR_NOIR, (240,215),(260,215),3) 
		pygame.draw.line(fen, COULEUR_ROUGE, (240,230),(240,330),8)
		pygame.draw.line(fen, COULEUR_ROUGE, (200,270),(280,270),8)
		pygame.display.update()
	if faux == 4:
		pygame.draw.circle(fen, COULEUR_ROUGE, (240, 200), 30)
		pygame.draw.circle(fen, COULEUR_NOIR, (240, 190), 6)
		pygame.draw.circle(fen, COULEUR_NOIR, (260, 190), 6)
		pygame.draw.line(fen, COULEUR_NOIR, (240,215),(260,215),3)
		pygame.draw.line(fen, COULEUR_ROUGE, (240,230),(240,330),8)
		pygame.draw.line(fen, COULEUR_ROUGE, (200,270),(280,270),8)
		pygame.draw.line(fen, COULEUR_ROUGE, (240,330),(210,360),8)
		pygame.display.update()
	if faux == 5:
		pygame.draw.circle(fen, COULEUR_ROUGE, (240, 200), 30)
		pygame.draw.circle(fen, COULEUR_NOIR, (240, 190), 6)
		pygame.draw.circle(fen, COULEUR_NOIR, (260, 190), 6)
		pygame.draw.line(fen, COULEUR_NOIR, (240,215),(260,215),3)
		pygame.draw.line(fen, COULEUR_ROUGE, (240,230),(240,330),8)
		pygame.draw.line(fen, COULEUR_ROUGE, (200,270),(280,270),8)
		pygame.draw.line(fen, COULEUR_ROUGE, (240,330),(210,360),8)
		pygame.draw.line(fen, COULEUR_ROUGE, (240,330),(270,360),8)
		pygame.display.update()

pygame.quit()




