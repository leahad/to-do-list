package wild.todo.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import wild.todo.Entity.ToDo;
import wild.todo.Repository.ToDoRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class ToDoController {

    private ToDoRepository toDoRepository;

    public ToDoController(ToDoRepository toDoRepository) {
        this.toDoRepository = toDoRepository;
    }

    @GetMapping("/todolist")
    public ResponseEntity<List<ToDo>> getToDoList() {
        List<ToDo> toDoList = toDoRepository.findAll();
        if (!toDoList.isEmpty()) {
            return ResponseEntity.ok(toDoList);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/todo/{id}")
    public ResponseEntity<Optional<ToDo>> getToDo(@PathVariable Long id) {
        Optional<ToDo> toDo = toDoRepository.findById(id);
        if (toDo.isPresent()) {
            return ResponseEntity.ok(toDo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/todo")
    public ResponseEntity<ToDo> createToDo(@RequestBody ToDo toDo){
        ToDo savedToDo = toDoRepository.save(toDo);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedToDo);
    }

    @PutMapping("/todo/{id}")
    public ResponseEntity<ToDo>updateToDo(@PathVariable long id, @RequestBody ToDo toDo){
        ToDo toDoToUpdate = toDoRepository.findById(id).get();
        toDoToUpdate.setItem(toDo.getItem());
        toDoToUpdate.setDeadline(toDo.getDeadline());
        toDoToUpdate.setIsCompleted(toDo.getIsCompleted());
        ToDo updatedToDo = toDoRepository.save(toDoToUpdate);
        return ResponseEntity.ok(updatedToDo);
    }

    @DeleteMapping("todo/{id}")
    public ResponseEntity<Void> deleteToDo(@PathVariable long id){
        try {
            toDoRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
