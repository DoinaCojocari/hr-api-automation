import {expect, test} from "@playwright/test";
import { ApiHelper } from "../helpers/ApiHelper";
import { Department, DepartmentsEndpoint } from "../helpers/DepartmentsEndpoint";
import { CommonUtils } from "../utils/CommonUtils";
test.describe("Departments API E2E", () =>{
    test('Create -> Get -> Patch -> Put -> Delete -> Department Flow',
        async({request})=>{
            const apiHelper = new ApiHelper(request);
            const departments = new DepartmentsEndpoint(apiHelper);

            // Build a payload with required fields
            const payload = CommonUtils.createDepPayload();
            const Department_id = payload.department_id;
            const created = await departments.create(payload,201);
            expect(Department_id).toEqual(created.department_id);

            // Get the created department resource
            const fetchedDep = await departments.getResource(Department_id,200);

            // Patch Partial Update
            const patchPayload: Partial<Department> = { 
            department_name: `Patched${payload.department_name}`
            };
            const patched = await departments.
            update(Department_id,patchPayload,false,200);

            const afterPatch = await departments.getResource(Department_id,200);
            expect(afterPatch.department_name).toBe(patchPayload.department_name);

             const putPayload: Partial<Department> =CommonUtils.createDepPayload(
                Department_id,undefined,1000,`FullUpdate${payload.department_name}`
             );
            const fullyUpdated = await departments.
            update(Department_id,putPayload,true,200);

            const afterPut = await departments.getResource(Department_id,200);
            expect(afterPut.department_name).toBe(putPayload.department_name);

            await departments.deleteResource(Department_id,200);



        }
    )
})