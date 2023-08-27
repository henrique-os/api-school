const prisma = require("../../persistence/db/prisma");

module.exports = async (id) => {
  const deactivate = await prisma.student
    .update({
      where: { id },
      data: { isActive: false },
    })
    .then((student) => {
      return {
        err: null,
        student,
        sCode: 200,
      };
    })
    .catch((err) => {
      return {
        err,
        student: null,
        sCode: 400,
      };
    });

  return deactivate;
};
