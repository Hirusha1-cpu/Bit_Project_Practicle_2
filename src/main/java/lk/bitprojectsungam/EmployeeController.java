package lk.bitprojectsungam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDateTime;
import java.util.List;

@RestController
public class EmployeeController {

    @Autowired
    private EmployeeDao dao;
    Designation designation = new Designation();

    // public EmployeeController(EmployeeDao dao) {
    // this.dao = dao;
    // }
    @RequestMapping(value = "/employee")
    public ModelAndView employeeUI() {
        ModelAndView viewEmp = new ModelAndView();
        viewEmp.setViewName("employeeModal.html");
        return viewEmp;
    }

    // create get mapping for get empllyee all data --- [/employee/findall]
    @GetMapping(value = "/employee/findall", produces = "application/json")
    public List<Employee> findAll() {
        // login user authentication and authorization
        return dao.findAll();
    }

    // create post mapping for save employee
    @PostMapping(value = "/employee")
    public String save(@RequestBody Employee employee) {
        try {
            employee.setAddeddatetime(LocalDateTime.now().toLocalDate());//set current date time
            employee.setEmpno("EMP003"); //emp no auto generated
            designation.setName("Software Engineer");
            // dao.save(designation);
            dao.save(employee);
            return "OK";
        } catch (Exception e) {

            return "save Not Completed" + e.getMessage();
        }

    }
}