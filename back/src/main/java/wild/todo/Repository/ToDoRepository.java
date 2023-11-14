package wild.todo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import wild.todo.Entity.ToDo;

@Repository
public interface ToDoRepository extends JpaRepository<ToDo, Long> {

}
