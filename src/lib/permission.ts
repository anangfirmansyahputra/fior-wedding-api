export const createPermissions = (routes: any) => {
  const permissionsSet = new Set();

  routes.forEach((route: any) => {
    const { path, methods } = route;
    const pathSegments = path
      .split("/")
      .filter((segment: any) => segment !== "");

    let objectName = "";

    pathSegments.forEach((segment: any) => {
      if (!segment.startsWith(":")) {
        objectName += `${segment}.`;
      }
    });

    objectName = objectName.slice(0, -1);

    methods.forEach((method: any) => {
      const actionName = method.toLowerCase();
      const permissionName = `${objectName}.${actionName}`;

      permissionsSet.add(permissionName);
    });
  });

  const permissions = Array.from(permissionsSet);

  const formattedPermissions = permissions.map((permission: any) =>
    permission.replace(/^api\./, "")
  );

  return formattedPermissions;
};
