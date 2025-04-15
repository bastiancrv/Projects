NAME = my_program
SRC = main.c

all:
	gcc -o $(NAME) $(SRC)

tests_run:
	@echo "Running tests..."

clean:
	rm -f *.o

fclean: clean
	rm -f $(NAME)

.PHONY: all tests_run clean fclean
