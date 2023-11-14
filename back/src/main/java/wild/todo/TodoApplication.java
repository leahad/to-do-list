package wild.todo;

import java.time.LocalDate;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import wild.todo.Entity.ToDo;
import wild.todo.Repository.ToDoRepository;

@SpringBootApplication
public class TodoApplication {

	private ToDoRepository toDoRepository;

	public TodoApplication(ToDoRepository toDoRepository) {
		this.toDoRepository = toDoRepository;
	}

	public static void main(String[] args) {
		SpringApplication.run(TodoApplication.class, args);
	}

	@Bean
	public CommandLineRunner run() throws Exception {
		return (String[] args) -> {
			ToDo todo1 = new ToDo("Create a to do list app", LocalDate.now());
			toDoRepository.save(todo1);
			ToDo todo2 = new ToDo("Make an Angular tutorial", LocalDate.now().minusDays(2));
			toDoRepository.save(todo2);
		};
	}
}
